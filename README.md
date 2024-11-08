# Next-Auth Authentication App

This project is a **Next.js 14** full-stack application with advanced authentication features, utilizing **Auth.js (NextAuth v5)** to manage user login, registration, and role-based access. It includes support for credential-based authentication, OAuth with Google and GitHub, and various security features like two-factor authentication, email verification, and role management.

## Key Features

- 🔐 **Auth.js (Next-Auth v5)** for flexible authentication flows
- 🚀 **Next.js 14** with support for server actions
- 🔑 **Credentials Provider** for username/password-based login
- 🌐 **OAuth Providers** for Google & GitHub social logins
- 🔒 **Forgot Password** functionality
- ✉️ **Email Verification** for new users
- 📱 **Two-Factor Verification (2FA)** for added security
- 👥 **User Roles**: Admin & User
- 🔓 **Login Component** with redirect or modal options
- 📝 **Register Component**
- 🤔 **Forgot Password Component**
- ✅ **Verification Component**
- ⚠️ **Error Component**
- 🔘 **Login Button**
- 🚪 **Logout Button**
- 🚧 **Role Gate** component to restrict content by role
- 🔍 Exploring **Next.js Middleware**
- 📈 Extending & Exploring **NextAuth Sessions**
- 🔄 Exploring **NextAuth Callbacks**
- 👤 `useCurrentUser` custom hook
- 🛂 `useRole` custom hook
- 🧑 `currentUser` utility function
- 👮 `currentRole` utility function
- 🖥️ Example with **Server Component**
- 💻 Example with **Client Component**
- 👑 Render content for admins using the **RoleGate Component**
- 🛡️ **Protect API Routes** for admins only
- 🔐 **Protect Server Actions** for admins only
- 📧 Change email with verification in **Settings Page**
- 🔑 Change password with confirmation in **Settings Page**
- 🔔 Enable/Disable two-factor auth in **Settings Page**
- 🔄 Change user role (development purposes only)

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/parves371/next-auth-v5.git
cd next-auth-v5
npm install



