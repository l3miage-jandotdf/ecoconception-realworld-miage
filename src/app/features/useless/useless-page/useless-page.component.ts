import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-useless-page",
  templateUrl: "./useless-page.component.html",
  styleUrls: ["./useless-page.component.css"],
})
export class UselessPageComponent implements OnInit {
  currentIndex = 0;
  images = [
    "https://via.placeholder.com/800x400/FF6347/FFFFFF?text=Image+1",
    "https://via.placeholder.com/800x400/4682B4/FFFFFF?text=Image+2",
    "https://via.placeholder.com/800x400/32CD32/FFFFFF?text=Image+3",
    "https://via.placeholder.com/800x400/FFD700/FFFFFF?text=Image+4",
  ];
  slug!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get("slug")!;
    setInterval(() => this.showNext(), 5000);
  }

  showNext(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  showPrev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.updateCarousel();
  }

  updateCarousel(): void {
    const carousel = document.querySelector(".carousel") as HTMLElement;
    const offset = -this.currentIndex * 100; // Each image takes 100% width
    carousel.style.transform = `translateX(${offset}%)`;
  }
}
