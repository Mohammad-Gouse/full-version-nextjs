// import React, { useEffect, useState } from 'react';
// import { Box, Button, Typography, IconButton } from '@mui/material';
// import UploadIcon from '@mui/icons-material/Upload';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Controller } from 'react-hook-form';

// const FileUploadField = ({ control, name, label, resetTrigger }) => {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileUpload = (event, onChange) => {
//     const file = event.target.files[0];
//     if (file) {
//       onChange(file);
//       setUploadedFile(file); // Store the uploaded file
//     }
//   };

//   const handleFileDelete = (onChange) => {
//     onChange(null);
//     setUploadedFile(null); // Reset the uploaded file
//   };

//   // Reset file upload field when the form is reset
//   useEffect(() => {
//     if (resetTrigger) {
//       setUploadedFile(null);
//     }
//   }, [resetTrigger]);

//   return (
//     <Box sx={{ border: '1px solid #E0E0E0', padding: '5px', borderRadius: '8px' }}>
//       <Typography style={{ fontSize: "10px", fontWeight:"600", color: '#818589' }}>
//         {label}
//       </Typography>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={null}
//         render={({ field }) => (
//           <Box>
//             {!uploadedFile ? (
//               <Button
//                 fullWidth
//                 component="label"
//                 startIcon={<UploadIcon style={{ color: '#9799AB' }} />}
//                 sx={{
//                   color: '#9799AB',
//                   backgroundColor: '#ffffff',
//                   padding: '10px',
//                   border: '0.5px dotted #25335C',
//                   borderRadius: '5px',
//                   textAlign: 'center',
//                   background: "#F0F3FF",
//                   fontSize: "0.6rem",
//                   margin: "5px 0px",
//                 }}
//               >
//                 {label}
//                 <input
//                   type="file"
//                   accept=".jpg,.png,.pdf,.csv"
//                   multiple="false"
//                   onChange={(e) => handleFileUpload(e, field.onChange)}
//                   style={{ display: 'none' }}
//                 />
//               </Button>
//             ) : (
//               <Box
//                 sx={{
//                   backgroundColor: '#ffffff',
//                   padding: '5px',
//                   borderRadius: '5px',
//                   background: "#F0F3FF",
//                   margin: "5px 0px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between"
//                 }}
//               >
//                 <Typography sx={{ fontSize: '10px', wordBreak: 'break-word' }}>
//                   {uploadedFile.name}
//                 </Typography>
//                 <IconButton
//                   aria-label="delete"
//                   size="small"
//                   onClick={() => handleFileDelete(field.onChange)}
//                   sx={{
//                     marginLeft: '10px',
//                   }}
//                 >
//                   <DeleteIcon fontSize="0.6rem" />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>
//         )}
//       />
//     </Box>
//   );
// };

// export default FileUploadField;




import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from 'react-hook-form';
import { Toast } from 'primereact/toast'; // Import PrimeReact Toast

const FileUploadField = ({ control, name, label, resetTrigger }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const toast = useRef(null); // Initialize the toast ref
  const fileInputRef = useRef(null); // Ref for the file input element

  const handleFileUpload = (event, onChange) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type (JPG or PNG)
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.current.show({
          severity: 'error',
          summary: 'File Error',
          detail: 'Only JPG and PNG files are allowed',
          life: 3000,
        });
        // Reset the input value so that the same file can be uploaded again
        fileInputRef.current.value = '';
        return;
      }

      // Validate file size (Max 400KB)
      const maxSize = 400 * 1024; // 400KB
      if (file.size > maxSize) {
        toast.current.show({
          severity: 'error',
          summary: 'File Size Error',
          detail: 'File size should not exceed 400KB',
          life: 3000,
        });
        // Reset the input value so that the same file can be uploaded again
        fileInputRef.current.value = '';
        return;
      }

      // If file is valid, clear any previous error and set the file
      onChange(file);
      setUploadedFile(file);
    }

    // Reset the input value so the same file can be uploaded again
    fileInputRef.current.value = '';
  };

  const handleFileDelete = (onChange) => {
    onChange(null);
    setUploadedFile(null); // Reset the uploaded file
  };

  // Reset file upload field when the form is reset
  useEffect(() => {
    if (resetTrigger) {
      setUploadedFile(null);
    }
  }, [resetTrigger]);

  return (
    <Box sx={{ border: '1px solid #E0E0E0', padding: '5px', borderRadius: '8px', minHeight:"6rem" }}>
      <div className="card flex justify-content-center">
        <Toast
          ref={toast}
          position="bottom-center"
          className="small-toast"
        />
      </div>
      <Typography style={{ fontSize: "10px", fontWeight: "600", color: '#818589' }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Box>
            {!uploadedFile ? (
              <Button
                fullWidth
                component="label"
                startIcon={<UploadIcon style={{ color: '#9799AB' }} />}
                sx={{
                  color: '#9799AB',
                  backgroundColor: '#ffffff',
                  padding: '10px',
                  border: '0.5px dotted #25335C',
                  borderRadius: '5px',
                  textAlign: 'center',
                  background: "#F0F3FF",
                  fontSize: "0.6rem",
                  margin: "5px 0px",
                }}
              >
                <div>{label}</div>
                
                <input
                  type="file"
                  accept=".jpg,.png"
                  multiple={false}
                  onChange={(e) => handleFileUpload(e, field.onChange)}
                  style={{ display: 'none' }}
                  ref={fileInputRef} // Attach the ref to the input
                />
              </Button>
              
            ) : (
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '5px',
                  background: "#F0F3FF",
                  margin: "5px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Typography sx={{ fontSize: '10px', wordBreak: 'break-word' }}>
                  {uploadedFile.name}
                </Typography>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleFileDelete(field.onChange)}
                  sx={{
                    marginLeft: '10px',
                  }}
                >
                  <DeleteIcon fontSize="0.6rem" />
                </IconButton>
              </Box>
            )}
             {!uploadedFile &&(<Typography sx={{ fontSize: '0.5rem', color: '#9799AB', marginTop: '2px', textAlign:"center" }}>
                  Allowed JPG or PNG. Max size of 400KB.
              </Typography>)}
          </Box>
        )}
      />
    </Box>
  );
};

export default FileUploadField;

