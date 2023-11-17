pipeline {
    agent any

    stages {
        stage('Git check') {
            steps {
                git branch: "main", url: 'https://github.com/alibekkenny/afisha_back_end.git'
            }
        }

        stage('Building') {
            steps {
                sh 'npm install'
            }
        }

        stage('Testing') {
            steps {
                sh 'npm test'
            }
        }

        stage('Run Project') {
            steps {
                sh 'nohup npm start &'
            }
        }
    }

    post {
        success {
            echo 'Succesfully performed'
        }
        failure {
            echo 'Failed to perform'
        }
    }
}
