const { join } = require('path');
const  fs = require('fs');

const FILE_PATH = join(__dirname, 'employees.json')

const months=  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];

function handleFullTable(employees){
    const reportConsolidated = employees.map( employ => {
        return {
            id: employ.id,
            name: employ.name,
            salary: parseFloat(employ.salary).toFixed(2)
        }
    });
    reportConsolidated.map( (employ, employIdx) => {
        employ.retained = 0
        months.map( (month, monthIdx) => {
            let employSales = employees[employIdx].sales[monthIdx]
            employ.retained += (employSales * 15 / 100) + Number(employees[employIdx].salary)
            return employ[month] = employees[employIdx].sales[monthIdx]
        })
        employ.retained = parseFloat(employ.retained).toFixed(2) 
        return employ
    })
    console.table(reportConsolidated) 
}

function handleEmployeesTable(employees){
    const employeesTable = employees.map( employ => {
        return{
            id : employ.id,
            nome: employ.name,
            salario: `R$ ${parseFloat(employ.salary).toFixed(2)}`
            
        }
    })
    console.table(employeesTable)
}
function handleEmployeesInsert(employ, monthId){
    let {name} = employ
    const employeesTable = {
            [name]: {
                id : employ.id,
                Salario: `R$ ${parseFloat(employ.salary).toFixed(2)}`,
                Vendas: `R$ ${parseFloat(employ.sales[monthId]).toFixed(2)}`,
                Comissao: `R$ ${parseFloat(employ.sales[monthId] * 15 /100).toFixed(2)}`,
                Total: `R$ ${parseFloat(employ.salary + employ.sales[monthId] * 15 /100).toFixed(2)}`
            }
        }
    console.table(employeesTable)
}

function save(content){
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(FILE_PATH, contentString)
}

function load() {
    const fileBuffer = fs.readFileSync('./employees.json', 'utf-8');
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}
module.exports= {
    handleEmployeesInsert,
    handleEmployeesTable,
    handleFullTable,
    save,
    load
}