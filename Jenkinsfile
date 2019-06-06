pipeline {
  environment {
    registry = "plmzphoebus/node-docker"
    registryCredential = 'dockerhub'
    def newApp
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
        docker.withRegistry( 'https://' + registry, registryCredential ) {
          def buildName = registry + ":$BUILD_NUMBER"
          newApp = docker.build buildName
          newApp.push()
        }
      }
    }
    stage('Deploy Image') {
      steps{
        docker.withRegistry( 'https://' + registry, registryCredential ) {
          newApp.push 'latest'
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
        sh "docker rmi $registry:latest"
      }
    }
  }
}