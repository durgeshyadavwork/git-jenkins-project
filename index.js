const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('I’m a DevOps and Cloud Engineer with strong experience in managing AWS Cloud, on-premise, and physical servers. In my current company, I work on creating and managing infrastructure using Terraform. I have hands-on experience with AWS Cloud, on-premise cloud, and physical servers.I have set up and managed CI/CD pipelines using Jenkins to automate code build, testing, and deployment. This helps reduce manual work and speeds up and smooths the deployment process.I use Grafana, Prometheus, and Loki for monitoring and log management. These tools help me track system health and application logs in real time and send alerts when needed.I also have good experience with Docker and Kubernetes. I have deployed container-based applications and worked with Kubernetes clusters, managing resources, deployments, and scaling.I regularly work on Linux and Windows servers, doing system tasks, troubleshooting, and writing automation scripts using Bash and Python3. I also use Git for version control and work closely with the development team. I enjoy building reliable systems and solving real-world infrastructure challenges. I ensure daily cloud backup and server protection using Acronis tools across all environments.');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
