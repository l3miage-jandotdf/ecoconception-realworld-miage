import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-useless-page",
  templateUrl: "./useless-page.component.html",
  styleUrls: ["./useless-page.component.css"],
})
export class UselessPageComponent implements OnInit {
  slug!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get("slug")!;
  }
}
