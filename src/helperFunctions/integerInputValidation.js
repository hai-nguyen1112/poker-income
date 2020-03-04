export default function(e) {
    if (e.keyCode === 48 && e.target.value.length === 0) {
        e.preventDefault()
    }
    if (e.keyCode === 190 || e.keyCode === 69 || e.keyCode === 189) {
        e.preventDefault()
    }
}