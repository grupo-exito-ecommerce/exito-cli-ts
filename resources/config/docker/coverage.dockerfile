# Docker file specification
#################################
#
# This docker file, install all sources for puppeteer and run the auto-login config for vtex
# Before run all commands for the needing proccees
# 
FROM node:8-slim

ENV WORKDIR /react
ENV SONAR_SCANNER_HOME ${WORKDIR}/node_modules/sonar-scanner/bin/
ENV SONAR_SCANNER_VERSION 3.1.0.1141
ENV SONAR_OPTS ''

RUN apt-get update
RUN apt-get install sudo

# Add Sudo Access
RUN adduser --disabled-password --gecos '' docker
RUN adduser docker sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER docker

COPY ./react ${WORKDIR}

WORKDIR ${WORKDIR}

USER docker

RUN ls
RUN echo "Start Vtex proccess to link the current react"

RUN echo "Install dependencies and generate coverage"
RUN sudo npm install
# RUN ls -la


# RUN sudo chmod +x ./node_modules/sonar-scanner/bin/sonar-scanner
RUN sudo yarn run coverage

RUN sudo chmod +x ./run-coverage.sh
RUN ./run-coverage.sh

# RUN cd /usr/bin && sudo ln -s node_modules/sonar-scanner/bin/sonar-scanner /usr/bin/sonar-scanner
# RUN sudo chmod +x /usr/bin/sonar-scanner

# RUN sonar-scanner
RUN cd /usr/bin && sudo ln -s /node_modules/sonar-scanner/bin/sonar-scanner sonar-scanner
ENV SONAR_RUNNER_HOME=/root/sonar-scanner
ENV PATH $PATH:/root/sonar-scanner/bin
RUN sudo sonar-scanner
# WORKDIR /usr
# RUN ls 
# RUN node_modules/sonar-scanner/bin/sonar-scanner
# RUN /usr/bin/sonar-scanner
# RUN  sudo chmod +x ${SONAR_SCANNER_HOME}sonar-scanner
# RUN echo ${SONAR_SCANNER_HOME}sonar-scanner
# # WORKDIR ${WORKDIR}/node_modules/sonar-scanner/bin/
# # RUN ls -la
# # ENV PATH="$PATH:${SONAR_SCANNER_HOME}"
# # RUN sudo sonar-scanner
# ENTRYPOINT ["sh", ${SONAR_SCANNER_HOME}sonar-scanner]
# # WORKDIR ${SONAR_SCANNER_HOME}
# # RUN ls
# # RUN chmod 777 ${SONAR_SCANNER_HOME}/bin/sonar-scanner
# # RUN ["chmod", "+x", "executable.sh"]
# # RUN chmod +xrw sonar-scanner
# # RUN sonar-scanner



