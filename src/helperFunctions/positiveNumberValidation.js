export default function(e) {
    if (e.keyCode === 190 || e.keyCode === 69 || e.keyCode === 189) {
        e.preventDefault()
    }
    if (e.target.value[0] === "0" && e.keyCode !== 8) {
        e.preventDefault()
    }
}