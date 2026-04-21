from crewai.tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field
from pypdf import PdfReader

class PDFReadToolInput(BaseModel):
    """Input schema for PDFReadTool."""
    pdf_path: str = Field(..., description="The path to the PDF file to read.")

class PDFReadTool(BaseTool):
    name: str = "pdf_read_tool"
    description: str = "Reads the entire content of a PDF file and returns it as a string. Useful for parsing SRS documents."
    args_schema: Type[BaseModel] = PDFReadToolInput

    def _run(self, pdf_path: str) -> str:
        try:
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
        except Exception as e:
            return f"Error reading PDF: {str(e)}"
