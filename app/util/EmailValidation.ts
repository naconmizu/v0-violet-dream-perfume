class EmailValidation {
    static validateEmail(email: string): boolean {
        if (!email) {
            console.warn("Email is empty");
            return false
        }
        if (email.length > 254) {
            console.warn("Email exceeds maximum length of 254 characters");
            return false
        }
        if (email.length < 6) {
            console.warn("Email is too short, minimum length is 6 characters");
            return false
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
}

export default EmailValidation