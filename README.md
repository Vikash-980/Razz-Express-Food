# 🍕 Razz Express - Full Stack Food Delivery Platform
Modern food delivery platform with **Customer App** + **Admin Panel**. Built with MERN stack and deployed on Render.

<table align="center">
  <tr>
    <td align="center">
      <img width="900" height="500" alt="Food-1" src="https://github.com/user-attachments/assets/1c62d515-4da5-4587-9a50-9cb70e75cfd1" />
      <img width="900" height="500" alt="Laptop View" src="https://github.com/user-attachments/assets/5e0d195a-5956-4f53-a572-f64223338d81" />
      <br><em>🖥️ Laptop View</em>
    </td>
    <td align="center">
      <img width="450" height="650" alt="Mobile View" src="https://github.com/user-attachments/assets/31043a72-e372-45da-8d68-42a417d8b6a2" />
      <br><em>📱 Mobile View</em>
    </td>
  </tr>
</table>


## 🌐 Live Demo
| Component | Live Link |
|-----------|-----------|
| 🍽 **Customer App** | [https://razz-express-food-frontend.onrender.com](https://razz-express-food-frontend.onrender.com) |
| 👨‍💼 **Admin Panel** | [https://razz-express-food-admin.onrender.com](https://razz-express-food-admin.onrender.com) |
| ⚙ **Backend API** | [Backend URL] |


## 🏗 File Structure

```
razz-express/
├── frontend/          # Customer App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
│
├── admin/             # Admin Panel
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
│
└── backend/           # API Server
    ├── models/
    ├── routes/
    ├── middleware/
    ├── controllers/
    └── server.js
```

## ✨ Features


### **Customer App**
✅ Browse restaurants & menu  
✅ Add to cart & checkout  
✅ Order tracking  
✅ Responsive design  

### **Admin Panel**
✅ Manage restaurants  
✅ Add/Edit food items  
✅ View all orders  
✅ Order status updates  

## 🛠 Tech Stack

**Frontend**

**Backend**

**Database**

## 🏗 Project Structure

## 🌐 Sample API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Customer signup |
| `POST` | `/api/auth/login` | Customer login |
| `GET` | `/api/restaurants` | Fetch restaurants |
| `POST` | `/api/orders` | Place order |
| `GET` | `/api/admin/orders` | Admin fetch orders |

## 🚀 Quick Setup

```bash
# Clone repo
git clone YOUR_REPO_URL
cd razz-express

# Backend
cd backend && npm install && npm start

# Customer App  
cd frontend && npm install && npm start

# Admin Panel
cd admin && npm install && npm start

