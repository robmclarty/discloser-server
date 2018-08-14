#!/bin/bash
# POSIX

# Handling flags/options
# http://mywiki.wooledge.org/BashFAQ/035

# Vars:
# -t --tag (specific tag/versionioned docker image to use from local host)
# -u --username (`ubuntu` by default)
# -h --host (remote server host accessed with ssh; can be a label defined in your ssh config)
# -k --key (private ssh key for remote host; default use no key; e.g., if pub key is already on remote)
# -f --file - compose file (`docker-compose.prod.yml` by default)
# -n --name (arbitrary docker image name)

die() {
  printf '%s\n' "$1" >&2
  exit 1
}

# Initialize variables
tag=
username="ubuntu"
host=
key=
file="docker-compose.prod.yml"
name=

while :; do
  case $1 in
    -h|-\?|--help)
      show_help # Display a usage synopsis.
      exit
      ;;
    -f|--file) # Takes an option argument; ensure it has been specified.
      if [ "$2" ]; then
        file=$2
        shift
      else
        die 'ERROR: "--file" requires a non-empty option argument.'
      fi
      ;;
    -n|--name)
      if [ "$2" ]; then
        name=$2
        shift
      else
        die 'ERROR: "--name" requires a non-empty option argument.'
      fi
      ;;
    -t|--tag)
      if [ "$2" ]; then
        tag=$2
        shift
      else
        die 'ERROR: "--tag" requires a non-empty option argument.'
      fi
      ;;
    -u|--username)
      if [ "$2" ]; then
        username=$2
        shift
      else
        die 'ERROR: "--username" requires a non-empty option argument.'
      fi
      ;;
    -h|--host)
      if [ "$2" ]; then
        host=$2
        shift
      else
        die 'ERROR: "--host" requires a non-empty option argument.'
      fi
      ;;
    -k|--key)
      if [ "$2" ]; then
        key=$2
        shift
      else
        die 'ERROR: "--key" requires a non-empty option argument.'
      fi
      ;;
    --) # End of all options.
      shift
      break
      ;;
    -?*)
      printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
      ;;
    *) # Default case: No more options, so break out of the loop.
      break
  esac

  shift
done

# Remove existing unused images and containers from remote (so the disk doesn't fill up).
ssh $username@$host 'docker system prune -f' &&

# Transfer local image to remote.
docker save $tag | bzip2 | pv | ssh $username@$host 'bunzip2 | docker load' &&

# Should overwrite existing file on remote.
scp ./$file $username@$host:~/ &&

# Shutdown any existing instances that are currently running.
ssh $username@$host "docker-compose -f ~/$file -p $name down" &&

# Run docker-compose with above file on remote.
ssh $username@$host "docker-compose -f ~/$file -p $name up -d"
