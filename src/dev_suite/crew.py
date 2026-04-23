from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool, FileWriterTool, DirectoryReadTool
from dev_suite.tools.pdf_read_tool import PDFReadTool
from dev_suite.tools.nginx_tool import setup_nginx_for_react
import os

@CrewBase
class DevSuite():
    """DevSuite crew for parsing SRS, developing applications, and performing QA"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def __init__(self, llm_choice: str = "ollama"):
        self.llm = self._get_llm(llm_choice)

    def _get_llm(self, choice: str) -> LLM:
        if choice == "openai":
            return LLM(model="openai/gpt-4o")
        elif choice == "gemini":
            return LLM(model="google/gemini-2.0-flash")
        else:
            # Default to local Ollama
            return LLM(
                model=os.getenv("MODEL", "ollama/llama3.1"),
                base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
                temperature=0.2
            )

    @agent
    def srs_analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['srs_analyst'],
            tools=[PDFReadTool()],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @agent
    def app_developer(self) -> Agent:
        return Agent(
            config=self.agents_config['app_developer'],
            tools=[FileWriterTool(), DirectoryReadTool(), FileReadTool()],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @agent
    def devops_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['devops_engineer'],
            tools=[setup_nginx_for_react],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @agent
    def qa_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['qa_specialist'],
            tools=[DirectoryReadTool(), FileReadTool()],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @task
    def srs_parsing_task(self) -> Task:
        return Task(
            config=self.tasks_config['srs_parsing_task']
        )

    @task
    def app_development_task(self) -> Task:
        return Task(
            config=self.tasks_config['app_development_task'],
            context=[self.srs_parsing_task()]
        )

    @task
    def nginx_setup_task(self) -> Task:
        return Task(
            config=self.tasks_config['nginx_setup_task'],
            context=[self.app_development_task()]
        )

    @task
    def qa_validation_task(self) -> Task:
        return Task(
            config=self.tasks_config['qa_validation_task'],
            context=[self.srs_parsing_task(), self.app_development_task(), self.nginx_setup_task()]
        )

    @crew
    def crew(self) -> Crew:
        """Creates the DevSuite crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
