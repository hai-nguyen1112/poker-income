export default function(dateString) {
    let array = dateString.split(" ")
    let month =
        (
            array[1] === "Jan"
                ?
                "01"
                :
                array[1] === "Feb"
                    ?
                    "02"
                    :
                    array[1] === "Mar"
                        ?
                        "03"
                        :
                        array[1] === "Apr"
                            ?
                            "04"
                            :
                            array[1] === "May"
                                ?
                                "05"
                                :
                                array[1] === "Jun"
                                    ?
                                    "06"
                                    :
                                    array[1] === "Jul"
                                        ?
                                        "07"
                                        :
                                        array[1] === "Aug"
                                            ?
                                            "08"
                                            :
                                            array[1] === "Sep"
                                                ?
                                                "09"
                                                :
                                                array[1] === "Oct"
                                                    ?
                                                    "10"
                                                    :
                                                    array[1] === "Nov"
                                                        ?
                                                        "11"
                                                        :
                                                        array[1] === "Dec"
                                                            ?
                                                            "12"
                                                            :
                                                            "NaN"
        )
    return array[2] + "-" + month + "-" + array[0]
}