import sys
from pypdf import PdfReader

def extract_text(pdf_path, out_file):
    out_file.write(f"\n\n--- Content of {pdf_path} ---\n")
    try:
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            text = page.extract_text()
            if text:
                out_file.write(text + "\n")
    except Exception as e:
        out_file.write(f"Error reading {pdf_path}: {e}\n")

if __name__ == "__main__":
    with open("pdf_contents.utf8.txt", "w", encoding="utf-8") as f:
        for path in sys.argv[1:]:
            extract_text(path, f)
