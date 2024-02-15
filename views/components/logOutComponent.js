export async function  LogOut() {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/'
    } catch (error) {
        console.log('error');
    }
}