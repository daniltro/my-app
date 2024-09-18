import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
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

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Убираем ошибку при изменении значения
    setFormErrors((errors) => ({
      ...errors,
      [name]: value.trim() ? "" : "Это поле обязательно для заполнения",
    }));
  };

  const handleSubmit = () => {
    const errors: { [key: string]: string } = {};

    // Проверяем все поля на заполненность
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof IAddedDocument].trim()) {
        errors[key] = "Это поле обязательно для заполнения";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      if (initialData) {
        dispatch(
          updateDataItem({
            id: initialData.id,
            editItem: { ...formData, id: initialData.id },
            token,
          })
        );
      } else {
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
        <Typography>
          {initialData ? "Редактировать документ" : "Добавить новый документ"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="documentStatus"
          label="Статус документа"
          fullWidth
          value={formData.documentStatus}
          onChange={handleChange}
          error={!!formErrors.documentStatus}
          helperText={formErrors.documentStatus}
        />
        <TextField
          margin="dense"
          name="employeeNumber"
          label="Номер работника"
          fullWidth
          value={formData.employeeNumber}
          onChange={handleChange}
          error={!!formErrors.employeeNumber}
          helperText={formErrors.employeeNumber}
        />
        <TextField
          margin="dense"
          name="documentType"
          label="Тип документа"
          fullWidth
          value={formData.documentType}
          onChange={handleChange}
          error={!!formErrors.documentType}
          helperText={formErrors.documentType}
        />
        <TextField
          margin="dense"
          name="documentName"
          label="Название документа"
          fullWidth
          value={formData.documentName}
          onChange={handleChange}
          error={!!formErrors.documentName}
          helperText={formErrors.documentName}
        />
        <TextField
          margin="dense"
          name="companySignatureName"
          label="Подпись компании"
          fullWidth
          value={formData.companySignatureName}
          onChange={handleChange}
          error={!!formErrors.companySignatureName}
          helperText={formErrors.companySignatureName}
        />
        <TextField
          margin="dense"
          name="employeeSignatureName"
          label="Подпись работника"
          fullWidth
          value={formData.employeeSignatureName}
          onChange={handleChange}
          error={!!formErrors.employeeSignatureName}
          helperText={formErrors.employeeSignatureName}
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
          error={!!formErrors.employeeSigDate}
          helperText={formErrors.employeeSigDate}
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
          error={!!formErrors.companySigDate}
          helperText={formErrors.companySigDate}
        />
      </DialogContent>
      <DialogActions className={styles.buttonBox}>
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
