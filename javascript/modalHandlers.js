const openLoginButton = document.getElementById('open-login-dialog')
const loginDialog = document.getElementById('login-dialog')
const closeButton = document.getElementById('login-close-button') // Using ID

export function loginHandler() {
    openLoginButton.addEventListener('click', (event) => {
        // Change button text based on a condition (replace with your logic)
        event.preventDefault()
        if (openLoginButton.textContent === 'Register') {
            openLoginButton.textContent = 'Sign In'
        } else {
            openLoginButton.textContent = 'Register'
        }
        loginDialog.showModal() // Open the dialog
    })
    closeButton.addEventListener('click', () => {
        loginDialog.close()
    })
}
