import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener,
} from "@angular/core";
import { ArticlesService } from "../../core/services/articles.service";
import { ArticleListConfig } from "../../core/models/article-list-config.model";
import { Article } from "../../core/models/article.model";
import { ArticlePreviewComponent } from "./article-preview.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { LoadingState } from "../../core/models/loading-state.model";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-article-list",
  styleUrls: ["article-list.component.css"],
  templateUrl: "./article-list.component.html",
  imports: [ArticlePreviewComponent, NgForOf, NgClass, NgIf],
  standalone: true,
})
export class ArticleListComponent implements OnInit, OnDestroy {
  query!: ArticleListConfig;
  results: Article[] = [];
  currentPage = 1;
  totalPages: Array<number> = [];
  loading = LoadingState.NOT_LOADED;
  LoadingState = LoadingState;
  destroy$ = new Subject<void>();

  @Input() limit!: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    // On écoute le défilement pour détecter quand on est en bas de page
    window.addEventListener("scroll", this.onScroll);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener("scroll", this.onScroll);
  }

  // Méthode pour charger de nouveaux articles quand on arrive en bas
  onScroll = (): void => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      // Si on est en bas de la page, charger les articles suivants
      if (this.loading === LoadingState.LOADED && this.results.length > 0) {
        this.loadMoreArticles();
      }
    }
  };

  loadMoreArticles() {
    this.loading = LoadingState.LOADING;
    this.currentPage++;
    this.runQuery();
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = LoadingState.LOADING;
    this.results = [];

    this.articlesService
      .query(this.query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.loading = LoadingState.LOADED;
        this.results = data.articles;

        this.totalPages = []; // Vide car pas de pagination
      });
  }
}
