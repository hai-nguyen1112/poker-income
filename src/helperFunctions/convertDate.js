export default function(dateString) {
    let array = dateString.split("-")
    let month =
        (
            array[1] === "01"
                ?
                "Jan"
                :
                array[1] === "02"
                    ?
                    "Feb"
                    :
                    array[1] === "03"
                        ?
                        "Mar"
                        :
                        array[1] === "04"
                            ?
                            "Apr"
                            :
                            array[1] === "05"
                                ?
                                "May"
                                :
                                array[1] === "06"
                                    ?
                                    "Jun"
                                    :
                                    array[1] === "07"
                                        ?
                                        "Jul"
                                        :
                                        array[1] === "08"
                                            ?
                                            "Aug"
                                            :
                                            array[1] === "09"
                                                ?
                                                "Sep"
                                                :
                                                array[1] === "10"
                                                    ?
                                                    "Oct"
                                                    :
                                                    array[1] === "11"
                                                        ?
                                                        "Nov"
                                                        :
                                                        array[1] === "12"
                                                            ?
                                                            "Dec"
                                                            :
                                                            "NaN"
        )
    return array[2] + " " + month + " " + array[0]
}