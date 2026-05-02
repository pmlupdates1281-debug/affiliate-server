const express = require('express');
const axios = require('axios');
const app = express();

app.get('/go', async (req, res) => {
    const productUrl = req.query.url;

    try {
        const response = await axios.post(
            'https://api.earnkaro.com/affiliate/convert',
            {
                deal: productUrl,
                convert_option: "convert_only"
            },
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWY2MWI5YjJiNmFiYjM4MjM4YTRmYWQiLCJlYXJua2FybyI6IjUyNDUyMjUiLCJpYXQiOjE3Nzc3NDAxMzh9.dgeru1rXrB27eFBBhmkyvjuPXgUignlIGB9__OT9Pm0',
                    'Content-Type': 'application/json'
                }
            }
        );

        const affiliateLink = response.data.data;

        res.redirect(affiliateLink);

    } catch (error) {
        res.send("Error");
    }
});

app.listen(3000);
