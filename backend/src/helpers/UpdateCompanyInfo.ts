import cron from "node-cron";
import UpdateCompanyFolders from "../helpers/GetFolderInfo";

const startScheduler = async () => {
  console.log("Iniciando rotina de atualização de pastas...");

  // Executa imediatamente ao iniciar a aplicação
  await UpdateCompanyFolders();

  // Agendamento para rodar a cada 30 minutos
  cron.schedule("*/30 * * * *", async () => {
    console.log("Executando rotina agendada de atualização de pastas...");
    await UpdateCompanyFolders();
    console.log("Rotina concluída.");
  });

  console.log("Rotina de atualização agendada para rodar a cada 30 minutos.");
};

export default startScheduler;
