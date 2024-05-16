export async function fetchAdTypes() {
    try {
        const response = await fetch('http://localhost:3005/getAllAdTypes');
        if (!response.ok) {
            throw new Error('Failed to fetch ad types');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching ad types:', error);
        return [];
    }
}