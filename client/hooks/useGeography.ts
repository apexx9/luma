import { useState, useEffect } from "react";

export interface GeoState {
    countries: Array<{ name: string; code: string }>;
    states: string[];
    cities: string[];
    loadingCountries: boolean;
    loadingStates: boolean;
    loadingCities: boolean;
}

export function useGeography(selectedCountry: string, selectedState: string) {
    const [countries, setCountries] = useState<GeoState['countries']>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [loadingCountries, setLoadingCountries] = useState(false);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // Fetch countries on load
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoadingCountries(true);
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format: expected array');
                }

                const formatted = data
                    .map((c: any) => ({
                        name: c.name?.common || c.name || 'Unknown',
                        code: c.cca2 || 'Unknown'
                    }))
                    .filter((c: any) => c.name !== 'Unknown' && c.code !== 'Unknown')
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));

                setCountries(formatted);
            } catch (err) {
                console.error("Failed to load countries", err);
                const fallbackCountries = [
                    { name: "United States", code: "US" },
                    { name: "Canada", code: "CA" },
                    { name: "United Kingdom", code: "GB" },
                    { name: "Germany", code: "DE" },
                    { name: "France", code: "FR" },
                    { name: "Spain", code: "ES" },
                    { name: "Italy", code: "IT" },
                    { name: "Australia", code: "AU" },
                    { name: "Japan", code: "JP" },
                    { name: "China", code: "CN" }
                ];
                setCountries(fallbackCountries);
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        const fetchStates = async () => {
            if (!selectedCountry) {
                setStates([]);
                setCities([]);
                return;
            }

            try {
                setLoadingStates(true);
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/states",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ country: selectedCountry }),
                    }
                );

                const data = await res.json();
                setStates(data.data.states.map((s: any) => s.name));
            } catch (err) {
                console.error("Failed to load states", err);
            } finally {
                setLoadingStates(false);
            }
        };

        fetchStates();
    }, [selectedCountry]);

    // Fetch cities when state changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!selectedCountry || !selectedState) {
                setCities([]);
                return;
            }

            try {
                setLoadingCities(true);
                const res = await fetch(
                    "https://countriesnow.space/api/v0.1/countries/state/cities",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            country: selectedCountry,
                            state: selectedState,
                        }),
                    }
                );

                const data = await res.json();
                setCities(data.data || []);
            } catch (err) {
                console.error("Failed to load cities", err);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, [selectedState, selectedCountry]);

    return {
        countries,
        states,
        cities,
        loadingCountries,
        loadingStates,
        loadingCities
    };
}
