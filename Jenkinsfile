
//OLD Jenkinsfile
/*
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dugreshyadav/git-jenkins-project'
        EC2_HOST = 'ec2-user@15.206.172.142'    //chnage IP here
        EC2_KEY = credentials('ec2-ssh-key')  // Add in Jenkins > Credentials
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'git-jenkins-project',
                url: 'https://github.com/durgeshyadavwork/git-jenkins-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push $DOCKER_IMAGE:${BUILD_NUMBER}
                        
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@$EC2_HOST '
                        docker pull $DOCKER_IMAGE:${BUILD_NUMBER} &&
                        docker stop app || true &&
                        docker rm app || true &&
                        docker run -d --name app -p 3000:3000 $DOCKER_IMAGE:${BUILD_NUMBER}
                    '
                    """
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker rmi $DOCKER_IMAGE:${BUILD_NUMBER}'
            }
        }
    }
}

*/


//Single Branch Strategy

pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['test', 'prod'], description: 'Choose the deployment environment')
    }

    environment {
        DOCKER_IMAGE = 'dugreshyadav/git-jenkins-project'
        GIT_BRANCH = 'test/multibranch'  // single branch
        TEST_HOST = 'ec2-user@43.205.95.245'
        PROD_HOST = 'ec2-user@43.204.145.1'
        EC2_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Set Config Based on Environment') {
            steps {
                script {
                    env.TARGET_HOST = (params.ENVIRONMENT == 'test') ? TEST_HOST : PROD_HOST
                    env.IMAGE_TAG = "${params.ENVIRONMENT}-${BUILD_NUMBER}"
                }
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: "${GIT_BRANCH}",
                    url: 'https://github.com/durgeshyadavwork/git-jenkins-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push $DOCKER_IMAGE:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $TARGET_HOST '
                        docker pull $DOCKER_IMAGE:${IMAGE_TAG} &&
                        docker stop app || true &&
                        docker rm app || true &&
                        docker run -d --name app -p 3000:3000 $DOCKER_IMAGE:${IMAGE_TAG}
                    '
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi $DOCKER_IMAGE:${IMAGE_TAG} || true"
            }
        }
    }
}



//Multi Branch according

/*
pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['test', 'prod'], description: 'Choose the environment')
    }

    environment {
        DOCKER_IMAGE = 'dugreshyadav/git-jenkins-project'
        TEST_BRANCH = 'git-jenkins-test'
        PROD_BRANCH = 'git-jenkins-prod'
        TEST_HOST = 'ec2-user@15.206.172.142'
        PROD_HOST = 'ec2-user@13.233.100.99'
        EC2_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Select Branch & Host') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'test') {
                        env.GIT_BRANCH = "${TEST_BRANCH}"
                        env.TARGET_HOST = "${TEST_HOST}"
                        env.IMAGE_TAG = "test-${BUILD_NUMBER}"
                    } else {
                        env.GIT_BRANCH = "${PROD_BRANCH}"
                        env.TARGET_HOST = "${PROD_HOST}"
                        env.IMAGE_TAG = "prod-${BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: "${env.GIT_BRANCH}",
                    url: 'https://github.com/durgeshyadavwork/git-jenkins-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push $DOCKER_IMAGE:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $TARGET_HOST '
                        docker pull $DOCKER_IMAGE:${IMAGE_TAG} &&
                        docker stop app || true &&
                        docker rm app || true &&
                        docker run -d --name app -p 3000:3000 $DOCKER_IMAGE:${IMAGE_TAG}
                    '
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi $DOCKER_IMAGE:${IMAGE_TAG}"
            }
        }
    }
}

*/