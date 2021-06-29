import XLSX from 'xlsx'

function readExcel(file) {
    const types = file.name.split('.')[1]
    const allows = ['xls', 'xlsx']
    if (!allows) {
        //Handle Error
        return
    }

    const reader = new FileReader();
    var result = [];
    reader.onload = function (e) {
        const data = e.target.result;
        const wb = XLSX.read(data, { type: 'binary' })

        wb.SheetNames.forEach((sn) => {
            result.push({
                name: sn,
                sheet: XLSX.utils.sheet_to_json(wb.Sheets[sn])
            })
        })
    }

    reader.readAsBinaryString(file.raw)

    return result
}

export { readExcel }