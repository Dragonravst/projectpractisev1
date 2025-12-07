pipeline {
    agent { docker {
            image 'node:18'
            args '-u root:root'
        }
          }
    environment {
        DOCKER_IMAGE = 'akash13raja/nodejspostdocker'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        GITHUB_CREDENTIALS_ID = 'github-pat'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: env.GITHUB_CREDENTIALS_ID, url: 'https://github.com/Dragonravst/projectpractisev1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests only if available
                sh '''
                    if [ -f package.json ]; then
                        npm test || echo "No tests found"
                    fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', env.DOCKER_CREDENTIALS_ID) {
                        docker.image("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}").push()
                        docker.image("${env.DOCKER_IMAGE}:${env.DOCKER_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Deploy (Local Machine)') {
            steps {
                echo "Stopping old container..."
                sh 'docker stop my-app || true'
                sh 'docker rm my-app || true'

                echo "Pulling latest image..."
                sh "docker pull ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}"

                echo "Starting new container..."
                sh """
                    docker run -d --name my-app -p 3000:3000 ${env.DOCKER_IMAGE}:${env.DOCKER_TAG}
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline succeeded."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
