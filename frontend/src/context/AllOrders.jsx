export async function allOrders(accessToken) {
    try {
        const response = await fetch(`http://localhost:3005/getOrderByCustomerId`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return accessToken
    }
}