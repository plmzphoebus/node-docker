node {
    env.AWS_ECR_LOGIN=true
    def newApp
    def registry = 'plmzphoebus/node-docker'
    def registryCredential = 'dockerhub'
	
	stage('Cloning Git') {
		git 'https://github.com/plmzphoebus/node-docker.git'
	}
	stage('Build') {
		sh 'npm install'
	}
	stage('Building image') {
        docker.withRegistry( 'https://' + registry, registryCredential ) {
		    def buildName = registry + ":$BUILD_NUMBER"
            newApp = docker.build buildName
            newApp.push()
        }
	}
	stage('Registring image') {
        docker.withRegistry( 'https://' + registry, registryCredential ) {
    		newApp.push 'latest2'
        }
	}
    stage('Removing image') {
        sh "docker rmi $registry:$BUILD_NUMBER"
        sh "docker rmi $registry:latest"
    }
    
}