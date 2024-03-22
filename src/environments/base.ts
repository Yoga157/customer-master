/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: "/data-quality", // Fixes issue with Github Pages
    },
    api: {
      generic: `${baseApi}/api/DQGenericService/:controller`,
      serviceCatalog: `${baseApi}/api/DQServiceCatalog/:controller`,
      collabTools: `http://bhpapisrvdev.berca.co.id:4080/api/WeeklyReview/:controller`,
      funnel: `${baseApi}/api/DQFunnelService/:controller`,
      dedicated: `${baseApi}/api/DQDedicatedService/:controller`,
      auth: `${baseApi}/api/AuthServerService/:controller`,
      jde: `${baseApi}/api/DQJDEService/:controller`,
      kpi: `${baseApi}/api/DQKpiService/:controller`,
      // customer: `http://bhpapisrvdev.berca.co.id:7007/api/:controller`,
      customer: `https://localhost:5001/api/:controller`,
      login: `http://bhpapisrvdev.berca.co.id:7000/api/AuthServerService/:controller`,
    },
    isProduction: false,
    isDevelopment: true,
    isTesting: true,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
