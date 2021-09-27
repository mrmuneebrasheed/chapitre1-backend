const express = require("express");
const app = express();
const port = 3001;
const countries = require("./API.json");
app.listen(port, () => {
    console.log("Countries API working");
});

// pour récuperer tout les pays

app.get("/all", (req, res) => {
    res.send(countries);
});

// pour récuperer par nom de pay

app.get("/name/:name", (req, res) => {
    const countryName = req.params.name.toLowerCase();
    let searchedCountry;
    countries.forEach((country) => {
        if (country.name.toLowerCase().includes(countryName))
            searchedCountry = country;
    });
    if (searchedCountry) res.send(searchedCountry);
    else res.send("Country do not exist");
});

// pour récuperer par code du pay

app.get("/alpha/:code", (req, res) => {
    const code = req.params.code;
    let searchedCountry;
    countries.forEach((country) => {
        if (
            country.alpha2Code.toLowerCase() === code.toLowerCase() ||
            country.alpha3Code.toLowerCase() === code.toLowerCase()
        )
            searchedCountry = country;
    });
    if (searchedCountry) res.send(searchedCountry);
    else res.send("Country do not exist");
});

// pour récuperer par currency du pay

app.get("/currency/:currency", (req, res) => {
    const requiredCurrency = req.params.currency.toLowerCase();
    let searchedCountry = [];
    countries.forEach((country) => {
        country?.currencies?.forEach((currency) => {
            if (currency?.code === requiredCurrency.toUpperCase()) {
                searchedCountry.push(country);
                return;
            }
        });
    });
    if (searchedCountry) res.send(searchedCountry);
    else res.send("Country do not exist");
});

// pour récuperer par nom du capital

app.get("/capital/:name", (req, res) => {
    const capitalName = req.params.name.toLowerCase();
    let searchedCountry;
    countries.forEach((country) => {
        if (country.capital?.toLowerCase().includes(capitalName))
            searchedCountry = country;
    });
    if (searchedCountry) res.send(searchedCountry);
    else res.send("Country do not exist");
});

// pour récuperer par nom du region

app.get("/region/:name", (req, res) => {
    const regionName = req.params.name.toLowerCase();
    let searchedCountry = [];
    countries.forEach((country) => {
        if (country.region?.toLowerCase().includes(regionName))
            searchedCountry.push(country);
    });
    if (searchedCountry) res.send(searchedCountry);
    else res.send("Country do not exist");
});

// en cas d'érreur

app.get("*", (req, res) => {
    res.send("Cannot get your request");
});
