import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "../../services/store";
import { IAddedDocument, IDocument } from "../../types/types";
import { addDataItem, updateDataItem } from "../../services/actions/actions";
import { formatDate } from "../../utils/utils";
import styles from "./documentForm.module.css";
interface DocumentFormProps {
  onClose: () => void;
  initialData?: IDocument | null;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  onClose,
  initialData,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IAddedDocument>({
    documentStatus: "",
    employeeNumber: "",
    documentType: "",
    documentName: "",
    companySignatureName: "",
    employeeSignatureName: "",
    employeeSigDate: "",
    companySigDate: "",
  });

  useEffect(() => {
    if (initialData) {
      // Заполняем форму данными для редактирования
      setFormData({
        documentStatus: initialData.documentStatus,
        employeeNumber: initialData.employeeNumber,
        documentType: initialData.documentType,
        documentName: initialData.documentName,
        companySignatureName: initialData.companySignatureName,
        employeeSignatureName: initialData.employeeSignatureName,
        employeeSigDate: formatDate(initialData.employeeSigDate),
        companySigDate: formatDate(initialData.companySigDate),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (initialData) {
        // Редактирование существующего документа
        dispatch(
          updateDataItem({
            id: initialData.id,
            editItem: { ...formData, id: initialData.id },
            token,
          })
        );
      } else {
        // Создание нового документа
        dispatch(addDataItem({ newItem: formData, token }));
      }
      onClose();
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        <h3 className={styles.dialogTitle}>Добавить новый документ</h3>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="documentStatus"
          label="Статус документа"
          fullWidth
          value={formData.documentStatus}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="employeeNumber"
          label="Номер работника"
          fullWidth
          value={formData.employeeNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="documentType"
          label="Тип документа"
          fullWidth
          value={formData.documentType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="documentName"
          label="Название документа"
          fullWidth
          value={formData.documentName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="companySignatureName"
          label="Подпись компании"
          fullWidth
          value={formData.companySignatureName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="employeeSignatureName"
          label="Подпись работника"
          fullWidth
          value={formData.employeeSignatureName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="employeeSigDate"
          label="Дата подписания работником"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.employeeSigDate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="companySigDate"
          label="Дата подписания компанией"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.companySigDate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className={styles.buttonBox} MuiDialogActions-root>
        <Button variant="contained" onClick={onClose} color="primary">
          Отмена
        </Button>

        <Button
          disabled={!isFormValid()}
          variant="contained"
          onClick={handleSubmit}
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentForm;
