export class ErrorClass {
    errorHelper(error: any): string {
      if (error.name === 'CastError') {
        return 'ID CHECK KAR KE BHEJ';
      }
  
      if (error.code === 11000) {
        return 'Dusra Email Id de'; 
      }
  
      let errorMessage = '';
  
      if (error.errors) {
       
        for (const key in error.errors) {
          if (error.errors.hasOwnProperty(key)) {
            errorMessage += error.errors[key].message + ', '; 
          }
        }
        return errorMessage.slice(0, -2);
      }
  
      return 'An unknown error occurred'; 
    }
  }
  