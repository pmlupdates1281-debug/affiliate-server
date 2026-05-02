const express = require('express');
const axios = require('axios');
const app = express();

app.get('/go', async (req, res) => {
    const productUrl = req.query.url;

    if (!productUrl) {
        return res.send("No URL provided");
    }

    try {
        const response = await axios.post(
            'https://api.earnkaro.com/affiliate/convert',
            {
                deal: productUrl,
                convert_option: "convert_only"
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const affiliateLink = response.data.data;

        res.redirect(affiliateLink);

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.send("Error generating link");
    }
});

app.listen(3000);
