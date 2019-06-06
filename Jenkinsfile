pipeline {
  environment {
    registry = "plmzphoebus/node-docker"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/plmzphoebus/node-docker.git'
      }
    }
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    stage('Building image') {
      steps{
        script {
          docker.withRegistry('https://hub.docker.com/r/plmzphoebus/node-docker', registryCredential) {
            dockerImage = docker.build(registry + ":$BUILD_NUMBER")
          }
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry('https://hub.docker.com/r/plmzphoebus/node-docker', registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}