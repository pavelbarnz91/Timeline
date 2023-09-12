export default function validitiInputGeolocation(value) {
    const regExp = /^(\[)?[-+]?([0-9]*[.])?[0-9]+(\s*,\s*|\s+)(-)?([0-9]*[.])?[0-9]+(\])?$/;
        
    if(regExp.test(value)) {
        return {
            status: true,
            coords: `${value}`
        };
    } else {
        return {
            status: false,
            coords: 'Координаты отклонены пользователем.',
        }
    };
}