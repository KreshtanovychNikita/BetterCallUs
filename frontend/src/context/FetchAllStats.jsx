export async function fetchAllStats( formDataInput , typeOfAd) {
    try {
        const formData = {
            ad_type: typeOfAd,
            product_profit: parseFloat(formDataInput.productPriceWithoutAd),
            last_ad_day: parseFloat(formDataInput.adDuration),
            product_cost: parseFloat(formDataInput.productPrice),
            ad_number: parseFloat(formDataInput.adCount),
            max_customer_number: parseFloat(formDataInput.userCount)
        };

        console.log(formData)

        const response = await fetch('http://localhost:3005/calculating/fetchAllStats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch ad types');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching ad types:', error);
        return [];
    }
}
