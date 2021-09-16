const { handleEmployeesInsert ,handleFullTable ,handleEmployeesTable, load, save} = require('./utils.js')
const readline = require('readline-sync')


let {employees} = load()
handleFullTable(employees)
console.log("Bem vindo ao controle de salario de funcionarios");
// console.table(handleFullTable());
console.log("Voce pode consultar os ganhos do mes de um funcionariohandleEmployeesConsult ou adiconar  atualizar um novo funcionario. O que gostaria de fazer?");
console.log("Digite 'C' para consulta / Digite 'N' para novo funcionario / Para sair digite 'S'.   ");
let getAction = readline.question("Informa sua opcao: ").toUpperCase();
while (getAction !== 'S'){
    employees = load().employees
    if(getAction === 'N') {
        //recebe e verifica o input do nome do funcionário
        let name = readline.question("Digite a nome do funcionario? : ");
        while( name <=1 || name>=employees.length || typeof nome === "string") {
            console.log(`O nome do funcinário deve ser um número de 1 a ${employees.length}`);
            name = readline.question("Informe a nome do funcionário: ");
        };
        //recebe e verifica o input do salrio do funcionario
        let salary = readline.questionFloat("Digite o salario do funcionario? :");
        while( salary < 0 || typeof salary === "string") {
            console.log(`O salario deve ser um número maior que zero!`);
            salary = readline.questionFloat("Digite o salario do funcionario? :");
        };
        //recebe e verifica o mes para vendas a ser cadastrada
        let month = readline.questionInt("Digite o mes que deseja cadastrar? (de 1 a 12) : ") - 1;
        while( month <=1 || month >=12 || typeof month === "string") {
            console.log(`O mes deve ser um número de 1 a 12.`);
            month = readline.questionInt("Digite o mes que deseja cadastrar? (de 1 a 12) : ") - 1;
        };
        //recebe e verifica o valor de vendas no mes a ser cadastrado
        let monthSale = readline.questionFloat("Digite o valor de vendas no mes: ");
        while(typeof monthSale === 'string' || monthSale < 0){
            console.log("O valor de vendas deve ser um número e maior que zero: ");
            monthSale = readline.questionFloat("Digite o valor de vendas no mes: ");
        }
        let monthsSale = [];
        for (let i = 0; i < 12; i++) {
            monthsSale[i] = 0;
        }
        monthsSale[month] = monthSale;

        const employObjetct = {
            id: employees.length +1,
            name,
            salary,
            sales: monthsSale
        };
        //formato conteudo para um objeto que será parseado para json na função 'save()'
        const employeesObject = { 
            employees: [...employees, employObjetct ]
        }
        
        save(employeesObject)
        handleEmployeesInsert(employObjetct, month)
        
    }else if(getAction === 'C'){
        handleEmployeesTable(employees)
        const id = readline.questionInt("Informe o id do funcionario? : ")-1;
        while( typeof id === 'string' || id < 0 || id > employees.length){
            id = readline.questionInt(`Informe o id do funcionario? De ser um número de 1 a ${employees.length} : `);
        }

        let month = readline.questionInt("Digite o mes que deseja cadastrar? (de 1 a 12) : ") - 1;
        while( month <=1 || month >=12 || typeof month === "string") {
            console.log(`O mes deve ser um número de 1 a 12.`);
            month = readline.questionInt("Digite o mes que deseja cadastrar? (de 1 a 12) : ") - 1;
        };
        handleEmployeesInsert(employees[id], month)
} 

console.log("Voce pode consultar os ganhos do mes de um funcionario ou adiconar um novo funcionario. O que gostaria de fazer?");
console.log("Digite 'C' para consulta / Digite 'N' para novo funcionario / Para sair digite 'S'.   ");
getAction = readline.question("Deseja continuar ? : ").toUpperCase();
}
// if(getAction.toUpperCase === 'S'){ return console.log("Adeus")}

