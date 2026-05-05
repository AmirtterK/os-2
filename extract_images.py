import sys
import fitz # PyMuPDF

def extract_images(pdf_path):
    doc = fitz.open(pdf_path)
    for i in range(len(doc)):
        for img in doc.get_page_images(i):
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha > 3: # CMYK
                pix = fitz.Pixmap(fitz.csRGB, pix)
            pix.save(f"page_{i}_img_{xref}.png")

if __name__ == "__main__":
    extract_images(sys.argv[1])
