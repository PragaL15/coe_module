# 📘 Paper Correction Management System

## 📌 Project Overview
The **Paper Correction Management System** is a web-based application designed to streamline the process of evaluating examination papers. The system aims to:
- 🚀 Improve the efficiency of paper correction by automating workflows.
- 👩‍🏫 Provide faculty members with tools to evaluate papers effectively.
- 🛡️ Grant Heads of Departments (HODs) control over the paper evaluation process to ensure transparency and accountability.
- 💰 Minimize the overall cost and time associated with traditional paper correction methods.

## ✨ Features
- **📊 Faculty Dashboard**: Interface for teachers to access, evaluate, and manage assigned papers.
- **🛠️ HOD Control Panel**: Monitor and manage the evaluation process, reassign papers, and generate reports.
- **⏱️ Real-time Updates**: Track progress and completion status of paper corrections.
- **📝 Audit Trails**: Maintain logs for accountability and error tracking.
- **💡 Cost Analysis**: Insights into resources and costs associated with the correction process.

## 🛠️ Tech Stack
- **Frontend**: React.js ⚛️
- **Backend**: Golang 🐹
- **Database**: PostgreSQL 🐘
- **Deployment**: To be determined (e.g., AWS, Docker) ☁️

## 📁 Project Structure
```
project-root/
|-- backend/             # Golang backend code
|-- frontend/            # React frontend code
|-- database/            # PostgreSQL schema and queries
|-- docs/                # Documentation files
|-- README.md            # Project overview (this file)
```

## 🛠️ Installation
### ✅ Prerequisites
1. **Node.js** (for React) ⚡
2. **Golang** 🐹
3. **PostgreSQL** 🐘
4. **Git** 🛠️

### 🚀 Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PragaL15/coe_module
   cd coe_module
   ```

2. Set up the backend:
   ```bash
   cd backend
   go mod tidy
   go run main.go
   ```

3. Set up the frontend:
   ```bash
   npm create vite@latest
   cd frontend
   npm install
   npm run dev
   ```

4. Configure the PostgreSQL database:
   - 📂 Create a database using the provided schema in `database/schema.sql`.
   - 🔧 Update the backend configuration to connect to the database.

## 🎯 Usage
- 👩‍🏫 Faculty members can log in to view their assigned papers.
- 🛡️ HODs can manage assignments, review progress, and generate detailed reports.

## 🛤️ Roadmap
1. **Phase 1**: Core functionality - faculty evaluation and HOD controls.
2. **Phase 2**: Cost analysis and reporting modules.
3. **Phase 3**: Scalability and integration with external systems (if needed).

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. 🔀 Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. ✅ Commit changes and push to your fork.
4. 📩 Open a pull request.

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 📞 Contact
For any queries, please reach out to:
- **Project Owner**: PRAGALYA K 💻
- **GitHub Issues**: [`https://github.com/PragaL15/coe_module`](https://github.com/PragaL15/coe_module)
