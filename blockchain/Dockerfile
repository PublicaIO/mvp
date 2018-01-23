FROM ubuntu:xenial

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get -y -qq upgrade && \
    apt-get -y -qq install software-properties-common && \
    add-apt-repository ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get -y -qq install ethereum solc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*