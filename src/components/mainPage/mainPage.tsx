import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "../../services/store";
import {
  selectAllDocuments,
  selectDocumentsError,
  selectDocumentsLoading,
} from "../../services/slices/dataSlice";
import DocumentForm from "../form/documentForm";
import { IDocument } from "../../types/types";
import { fetchData, removeDataItem } from "../../services/actions/actions";
import { formatDate } from "../../utils/utils";
import styles from "./mainPage.module.css";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectAllDocuments);
  const loading = useSelector(selectDocumentsLoading);
  const error = useSelector(selectDocumentsError);
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<IDocument | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchData(token));
    }
  }, [dispatch, navigate]);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(removeDataItem({ id, token }));
    }
  };

  const handleEdit = (item: IDocument) => {
    setCurrentDocument(item);
    setIsFormOpen(true);
  };

  const handleOpenForm = () => {
    setCurrentDocument(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <div className={styles.container}>
      {error && typeof error === "string" && (
        <Typography color="error">{error}</Typography>
      )}

      {loading ? (
        <Box className={styles.spinnerBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Box className={styles.flexContainer}>
          <Box className={styles.headerButtonBox}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
            >
              Добавить новый документ
            </Button>
          </Box>
          <Box className={styles.documentContainer}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <Box key={item.id} className={styles.documentItem}>
                  <Typography className={styles.documentOption} variant="body2">
                    Статус документа: {item.documentStatus}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Номер работника: {item.employeeNumber}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Тип документа: {item.documentType}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Название документа: {item.documentName}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Подпись компании: {item.companySignatureName}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Подпись работника: {item.employeeSignatureName}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Дата подписания работником:{" "}
                    {formatDate(item.employeeSigDate)}
                  </Typography>
                  <Typography className={styles.documentOption} variant="body2">
                    Дата подписания компанией: {formatDate(item.companySigDate)}
                  </Typography>
                  <Box className={styles.buttonBox}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Удалить
                    </Button>
                  </Box>
                  <Box className={styles.buttonBox}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(item)}
                    >
                      Редактировать
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>Нет данных для отображения</Typography>
            )}
          </Box>
        </Box>
      )}
      {isFormOpen && (
        <DocumentForm onClose={handleCloseForm} initialData={currentDocument} />
      )}
    </div>
  );
};

export default MainPage;
