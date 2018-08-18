export function getDate(date) {
    const dateNow = new Date();
    let day = new Date(dateNow - new Date(date).getTime()).getDay();

    return `${day} ${day === 1 ? 'day' : 'days'} ago`;
}

export function formatPrice(cents) {
    return (cents / 100).toLocaleString("en-US", {
        style:"currency",
        currency: "USD"
    })
}

export function debounce(func, wait = 20, immediate = true) {
    var timeout;

    return function() {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function ads(prevProducts) {
    return [...prevProducts, {ads:`http://localhost:3000/ads/?r=${Math.floor(Math.random()*1000)}`}];
};

export async function fetchProducts(page, filter) {
    const promiseFetch = await fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${filter}`)
        .then(data => {
            return data.json()
        }).then(data => {
            return data;
        }).catch(err => {
            console.error(err)
        })
        
    return promiseFetch
}