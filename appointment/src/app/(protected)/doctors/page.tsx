import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";

import { PageActions } from "../../../components/ui/page-container";

const DoctorsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Médicos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie os médicos cadastrados no sistema
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <Plus />
            Adicionar Médico
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>Médicos</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
