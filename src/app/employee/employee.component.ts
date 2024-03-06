import { Component } from '@angular/core';

import{ FormGroup , FormControl , Validators } from '@angular/forms' ;


  @Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
  })
  export class EmployeeComponent {
    newEmployeeForm: FormGroup;
    employees: Array<{name: string, firstName: string, cin: string, actions: Array<{type: string, callback: Function}>}> = [];
    filteredEmployees: any[] = [];
    searchQuery: string = '';
    currentPage: number = 1;
    pageSize: number = 5;
    currentEmployees: any[5] = [5];
    openpopup:boolean =false;  

    constructor() {
      this.newEmployeeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        cin: new FormControl('', Validators.required)
      });
    }
    checkDuplicateEmployee(cin: string): boolean {
      return this.employees.some(employee => employee.cin === cin);
    }
    
    addEmployee(): void {
      if (this.newEmployeeForm.valid) {
        const name = this.newEmployeeForm.value.name;
        const firstName = this.newEmployeeForm.value.firstName;
        const cin = this.newEmployeeForm.value.cin;
        
        // Vérification si cin est un nombre entier et ne dépasse pas 6 chiffres
        if (!Number.isInteger(+cin) || cin.length !== 8) {
          alert('Le CIN est impossibile');
          return;
        }
    
        if (this.checkDuplicateEmployee(cin)) {
          alert('Désolé, cet employé est déjà dans ce tableau.');
          return;
        }
    
        this.employees.push({ 
          name, 
          firstName, 
          cin, 
          actions: [
            {type: 'view', callback: this.viewEmployee.bind(this)}, 
            {type: 'edit', callback: this.editEmployee.bind(this)}, 
            {type: 'delete', callback: this.deleteEmployee.bind(this)}
          ] 
        });
    
        // Reset the form after adding the employee
        this.newEmployeeForm.reset();
      } else {
        console.log('The form is not valid. Please fill in all fields and enter a valid CIN number.');
      }
    }
    
  
    viewEmployee(employee: {name: string, firstName: string, cin:string}): void {
     /* const confirmation = confirm(`View employee ${employee.name} ${employee.firstName} with CIN ${employee.cin}?`);*/
      this.openpopup =true;
     /* if (confirmation) {
        const message = `Nom: ${employee.name}\nPrénom: ${employee.firstName}\nCIN: ${employee.cin}`;
        alert(message);
      } else {
        console.log('View operation cancelled.');
      }*/
    }
    
    
  
    editEmployee(employee: {name: string, firstName: string, cin:string}): void {
      // On récupère les valeurs actuelles de l'employé
      const currentName = employee.name;
      const currentFirstName = employee.firstName;
      const currentCin = employee.cin;
    
      // On ouvre une boîte de dialogue pour permettre à l'utilisateur de saisir de nouvelles valeurs
      const newName = prompt("Enter the new name", currentName);
      const newFirstName = prompt("Enter the new first name", currentFirstName);
      const newCin = prompt("Enter the new CIN", currentCin);
    
      // Si l'utilisateur a saisi de nouvelles valeurs et a appuyé sur OK
      if (newName !== null && newFirstName !== null && newCin !== null) {
        // On effectue les modifications si les nouvelles valeurs sont valides
        if (newName.trim() !== '' && newFirstName.trim() !== '' && newCin.trim() !== '') {
          // Vérification si le nouveau CIN est un nombre entier et ne dépasse pas 6 chiffres
          if (!Number.isInteger(+newCin) || newCin.length !== 8) {
            alert('Le nouveau CIN est impossible.');
            return;
          }
    
          const confirmation = confirm(`Are you sure you want to edit the employee from ${currentName} ${currentFirstName} with CIN ${currentCin} to ${newName} ${newFirstName} with CIN ${newCin}?`);
    
          if (confirmation) {
            console.log(`Editing employee from ${currentName} ${currentFirstName} with CIN ${currentCin} to ${newName} ${newFirstName} with CIN ${newCin}`);
    
            // Mettre à jour l'employé avec les nouvelles valeurs
            employee.name = newName;
            employee.firstName = newFirstName;
            employee.cin = newCin;
          } else {
            console.log('Edit operation cancelled.');
          }
        } else {
          alert('Please enter valid values for name, first name, and CIN.');
        }
      } else {
        console.log('Edit operation cancelled.');
      }
    }
    
    
    
  
    deleteEmployee(employee: any) {
      if (confirm(" you sure you want to delete this employee?")) {
        const index = this.employees.indexOf(employee);
        if (index > -1) {
          this.employees.splice(index );
        }
      }
    }
  
   

   
    
  
    addEmployeeToTable(name: string, firstName: string, cin: string): void {
      this.employees.push({ 
        name, 
        firstName, 
        cin, 
        actions: [
          {type: 'view', callback: this.viewEmployee.bind(this)}, 
          {type: 'edit', callback: this.editEmployee.bind(this)}, 
          {type: 'delete', callback: this.deleteEmployee.bind(this)}
        ] 
      });
    }
   
    searchEmployee(searchQuery: string): void {
      this.filteredEmployees = this.employees.filter(employee => {
        return (
          employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.cin.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    
      // Si des employés sont trouvés, les afficher dans un message
      if (this.filteredEmployees.length > 0) {
        let message = 'Employés trouvés :\n';
        this.filteredEmployees.forEach(employee => {
          message += `Nom: ${employee.name}, Prénom: ${employee.firstName}, CIN: ${employee.cin}\n`;
        });
        alert(message);
      } else {
        // Si aucun employé n'est trouvé, afficher un message approprié
        alert('Aucun employé trouvé.');
      }
      this.updatePagination();
    }
    
    
    
   
    updatePagination(): void {
      // Calculer l'indice de début et de fin pour la pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.filteredEmployees.length);
  
      // Mettre à jour le tableau d'employés actuellement affiché
      this.currentEmployees = this.filteredEmployees.slice(startIndex, endIndex);
    }
  
    // Méthode pour changer de page
    goToPage(pageNumber: number): void {
      this.currentPage = pageNumber;
      // Mettre à jour la pagination pour afficher la nouvelle page
      this.updatePagination();
    }
  }
  
  
 