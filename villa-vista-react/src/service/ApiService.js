import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This is the  to get user bookings by the user id */
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is to delete a user */
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    /**villa */
    /* This  adds a new villa to the database */
    static async addVilla(formData) {
        const result = await axios.post(`${this.BASE_URL}/villa/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /* This  gets all availavle villa */
    static async getAllAvailableVilla() {
        const result = await axios.get(`${this.BASE_URL}/villa/all-available-villa`)
        return result.data
    }


    /* This  gets all availavle by dates villa from the database with a given date and a villa type */
    static async getAvailableVillaByDateAndType(checkInDate, checkOutDate, villaType) {
        const result = await axios.get(
            `${this.BASE_URL}/villa/available-villa-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&villaType=${villaType}`
        )
        return result.data
    }

    /* This  gets all villa types from thee database */
    static async getVillaTypes() {
        const response = await axios.get(`${this.BASE_URL}/villa/types`)
        return response.data
    }
    /* This  gets all villa from the database */
    static async getAllVilla() {
        const result = await axios.get(`${this.BASE_URL}/villa/all`)
        return result.data
    }
    /* This funcction gets a villa by the id */
    static async getVillaById(villaId) {
        const result = await axios.get(`${this.BASE_URL}/villa/villa-by-id/${villaId}`)
        return result.data
    }

    /* This  deletes a villa by the Id */
    static async deleteVilla(villaId) {
        const result = await axios.delete(`${this.BASE_URL}/villa/delete/${villaId}`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This updates a villa */
    static async updateVilla(villaId, formData) {
        const result = await axios.put(`${this.BASE_URL}/villa/update/${villaId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }


    /**BOOKING */
    /* This  saves a new booking to the databse */
    static async bookVilla(villaId, userId, booking) {

        console.log("USER ID IS: " + userId)

        const response = await axios.post(`${this.BASE_URL}/bookings/book-villa/${villaId}/${userId}`, booking, {
            headers: this.getHeader()
        })
        return response.data
    }

    /* This  gets all bokings from the database */
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return result.data
    }

    /* This  get booking by the cnfirmation code */
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`)
        return result.data
    }

    /* This is the  to cancel user booking */
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return result.data
    }


    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
// export default new ApiService();