const GetDateTime = (props) => {

    date = new Date(props.isoDate);

    am = 'AM';

    month = date.getMonth() + 1;
    day = date.getDate();
    year = date.getFullYear();

    hr = date.getHours();
    min = date.getMinutes();
 
    if (hr > 12) {
        am = 'PM';
        hr -= 12;
    }
    alert(month + '/' + day + '/' + year + ' ' + hr + ':' + min + ' ' + am);
    return(month + '/' + day + '/' + year + ' ' + hr + ':' + min + ' ' + am);
}

export default GetDateTime;