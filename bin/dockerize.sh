#!/bin/bash
# POSIX

# Handling flags/options
# http://mywiki.wooledge.org/BashFAQ/035

# Vars:
# -t --tag (specific tag/versionion for docker image)

die() {
  printf '%s\n' "$1" >&2
  exit 1
}

# Initialize variables
tag="0.0.1"
dockerfile="Dockerfile"

while :; do
  case $1 in
    -h|-\?|--help)
      show_help # Display a usage synopsis.
      exit
      ;;
    -t|--tag)
      if [ "$2" ]; then
        tag=$2
        shift
      else
        die 'ERROR: "--tag" requires a non-empty option argument.'
      fi
      ;;
    -f|--file)
      if [ "$2" ]; then
        dockerfile=$2
        shift
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

# Build docker image with specific tag while also updating :latest version.
docker build -t robmclarty/discloser-server:latest -t robmclarty/discloser-server:$tag -f $dockerfile .
