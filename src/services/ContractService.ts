import fs from 'node:fs';

interface IContract {
  id: string,
  dateIssue: Date,
  motoristName: string,
  documentNumber: string,
  documentSeries: string
}

export class DetailContractService {  
  async execute() {
    const data = [] as IContract[];

    for (var i = 0; i < 5; i++) {      
      data.push({
        id: i.toString(),
        dateIssue: new Date(),        
        documentNumber: "2758" + i,
        documentSeries: i.toString(),
        motoristName: "MOTORISTA DA SILA " + i
      })
    }

    return data;
  }

  async getPDFContract() {
    const fileBase64 = fs.readFileSync('public/files/file1.pdf', {encoding: 'base64'});

    return {
      fileBase64: fileBase64
    }
  }
}