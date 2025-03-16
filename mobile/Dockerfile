FROM archlinux:base-devel

# Locale and package manager configuration
RUN (printf "\nen_US.UTF-8 UTF-8\n" >> /etc/locale.gen) && (/usr/bin/locale-gen)
RUN sed -i "/\[multilib\]/,/Include/"'s/^#//' /etc/pacman.conf
RUN pacman -Syy

# Install Java 8 and essential tools
RUN pacman -S jdk8-openjdk --noconfirm
ENV JAVA_HOME=/usr/lib/jvm/default
RUN pacman -S --noconfirm sudo audit binutils make git fakeroot unzip

# Add build user
RUN useradd builduser -m 
RUN passwd -d builduser
RUN printf 'builduser ALL=(ALL) ALL\n' | tee -a /etc/sudoers

# Install Android SDK, Build Tools, and Platform Tools from AUR
RUN sudo -u builduser bash -c 'cd ~ && git clone https://aur.archlinux.org/android-sdk.git && cd android-sdk && makepkg -si --noconfirm'
RUN sudo -u builduser bash -c 'cd ~ && git clone https://aur.archlinux.org/android-sdk-build-tools.git  && cd android-sdk-build-tools && makepkg -si --noconfirm'
RUN sudo -u builduser bash -c 'cd ~ && git clone https://aur.archlinux.org/android-sdk-platform-tools.git  && cd android-sdk-platform-tools && makepkg -si --noconfirm'

# Android environment setup
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/emulator
ENV PATH=$PATH:$ANDROID_HOME/tools
ENV PATH=$PATH:$ANDROID_HOME/tools/bin
ENV PATH=$PATH:$ANDROID_HOME/platform-tools

# Install Android SDK platform 34 and build tools
RUN yes | sdkmanager --licenses
RUN yes | sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"

# Install Node.js
RUN pacman -S nodejs npm --noconfirm
# Set environment for Node.js and npm
ENV PATH=$PATH:/usr/bin/node
ENV PATH=$PATH:/usr/bin/npm
ENV NODE_ENV=production

# Switch to JDK 17 for building
RUN pacman -S jdk17-openjdk --noconfirm
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Copy application code and build

WORKDIR /app
COPY package.json /app/package.json

COPY shared /app/shared
COPY mobile /app/mobile

RUN npm -g install yarn
RUN yarn

WORKDIR /app/mobile/android/
RUN rm -rf .gradle

CMD ["./gradlew", "assembleRelease", "--no-daemon"]
